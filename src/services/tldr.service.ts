import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { OpenAIApi, Configuration } from 'openai';
import { OPENAI_API_KEY } from '@config';

export default class TldrService {
  public TldrService() {
    if (OPENAI_API_KEY === undefined) {
      throw new HttpException(500, 'OPENAI_API_KEY is not defined');
    }
  }

  public async tldrify(text: string): Promise<string> {
    if (isEmpty(text)) {
      throw new HttpException(400, 'text is empty');
    }

    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    console.info(configuration);
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${text}\n\nTl;dr`,
      temperature: 0.7,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 1,
    });
    console.info(JSON.stringify(response.data));

    return response.data.choices[0].text;
  }
}
