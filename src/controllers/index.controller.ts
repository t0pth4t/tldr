import { Body, Controller, Get, Post } from 'routing-controllers';
import TldrService from '@services/tldr.service';

@Controller()
export class IndexController {
  public tldrService = new TldrService();
  @Get('/')
  index() {
    return 'OK';
  }

  @Post('/tldr')
  async tldr(@Body() body: any) {
    const { text } = body;
    return await this.tldrService.tldrify(text);
  }
}
