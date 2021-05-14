import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMAilContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMAilContact;
  from?: IMAilContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}