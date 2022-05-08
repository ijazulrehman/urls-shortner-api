import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlEntity } from './entities/url.entity';

@Injectable()
export class UrlService {

  constructor(
    @InjectRepository(UrlEntity)
    private urlRepo: Repository<UrlEntity>
  ) { }

  async create(createUrlDto: CreateUrlDto, userId: number)
    : Promise<UrlEntity | null> {
    const exits = await this.urlRepo.findOne({
      where: {
        originalUrl: createUrlDto.originalUrl,
        user: {
          id: userId
        }
      }
    })

    if (exits) {
      throw new HttpException('Url already exits', HttpStatus.CONFLICT)
    }

    try {
      const newUrl = new UrlEntity({
        ...createUrlDto,
        user: {
          id: userId
        }
      });

      return await newUrl.save();
    } catch (error) {

      if (error.code === '23505')
        throw new HttpException(
          `${createUrlDto.shortCode} is already taken. Please be creative!`,
          HttpStatus.BAD_REQUEST
        )

      throw error;
    }
  }

  async findAll(userId):
    Promise<UrlEntity[] | null> {
    return await this.urlRepo.find({
      where: {
        user: {
          id: userId
        }
      }
    });
  }

  async findUrlByShortCode(shortCode: string)
    : Promise<UrlEntity | null> {

    const url = await this.urlRepo.findOne({
      where: {
        shortCode
      }
    })

    if (!url)
      throw new HttpException(`${shortCode} didn't exist`, HttpStatus.NOT_FOUND);

    return url
  }

  async countUrlClick(url):
    Promise<UrlEntity> {
    url.clicks++;
    return await url.save();
  }

  async update(id: string, updateUrlDto: UpdateUrlDto)
    : Promise<{
      updated: boolean
    }> {
    try {
      const updateRes = await this.urlRepo.update(id, updateUrlDto);
      if (updateRes.affected > 0) {
        return {
          updated: true
        }
      }

      return {
        updated: false
      }

    } catch (error) {
      if (error.code === '23505')
        throw new HttpException(
          `${updateUrlDto.shortCode} is already taken. Please be creative!`,
          HttpStatus.BAD_REQUEST
        )

      throw error;
    }
  }
}
