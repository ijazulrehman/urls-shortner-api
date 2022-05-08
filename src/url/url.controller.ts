import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { UrlEntity } from './entities/url.entity';

@Controller()
@ApiTags('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req,
    @Body() createUrlDto: CreateUrlDto
  ) {
    const { id: userId } = req.user;
    return await this.urlService.create(createUrlDto, userId);
  }

  @ApiOkResponse({
    type: [UrlEntity]
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Req() req
  ) {
    const { userId } = req.user;
    return this.urlService.findAll(userId);
  }



  @Get(':shortCode')
  async redirectUrl(
    @Req() req,
    @Res() res,
    @Param('shortCode') shortCode: string
  ) {
    const url = await this.urlService.findUrlByShortCode(shortCode.toLowerCase());
    if (url) {
      await this.urlService.countUrlClick(url);
      return res.redirect(url.originalUrl);

    }
  }

  @ApiOkResponse({
    type: UrlEntity
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':shortCode/stats')
  async findOne(
    @Param('shortCode') shortCode: string
  ) {
    return await this.urlService.findUrlByShortCode(shortCode.toLowerCase());
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateUrlDto: UpdateUrlDto
  ) {
    return this.urlService.update(id, updateUrlDto);
  }
}
