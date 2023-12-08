import { inject, injectable } from 'tsyringe';
import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import path from 'path';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { AppError } from '@shared/error/AppError';
import { IEmailRepository } from '../repositories/EmailRepository.interface';
import { IUserRepository } from '../repositories/UserRepository.interface';
import { IFillEmailDTO } from './dto/FillEmailDTO';

@injectable()
class FillEmailService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('EmailRepository')
    private emailRepository: IEmailRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    days_to_send,
  }: IFillEmailDTO): Promise<void> {
    const messages = [
      'Acredite: você é mais forte do que imagina.',
      'Seja a mudança que você deseja ver no mundo. - Mahatma Gandhi',
      'O segredo do sucesso é começar onde está, usar o que tem e fazer o que pode. - Arthur Ashe',
      'Cada pequeno passo nos aproxima do nosso grande objetivo.',
      'A persistência é o caminho do êxito. - Charles Chaplin',
      'Você é capaz de superar todos os obstáculos que surgirem no seu caminho.',
      'O otimismo é a fé em ação. Nada se pode realizar sem otimismo. - Helen Keller',
      'Seja a mudança que você deseja ver no mundo.',
      'Nenhum obstáculo será grande se a sua vontade de vencer for maior.',
      'Quanto maior a dificuldade, maior a glória.',
      'Pare de adiar seus sonhos. O momento de agir é agora.',
      'A única forma de fazer um excelente trabalho é amar o que você faz. - Steve Jobs',
      'Nunca é tarde demais para ser aquilo que você poderia ter sido. - George Eliot',
      'Você nunca saberá o quão forte é até que ser forte seja a única escolha.',
      'Você é mais corajoso do que imagina, mais forte do que parece e mais inteligente do que pensa.',
      'O sucesso é a soma de pequenos esforços repetidos dia após dia. - Robert Collier',
      'Acredite no impossível, busque o improvável e conquiste o inimaginável.',
      'O caminho para o topo começa no primeiro passo.',
      'Cada novo dia é uma nova chance para alcançar seus objetivos.',
      'Não espere por oportunidades, crie-as.',
      'Nada é permanente, inclusive os nossos problemas.',
      'O fracasso é apenas uma oportunidade para recomeçar de forma mais inteligente.',
      'A vitória é para aqueles que persistem, mesmo após todos terem desistido.',
      'O que te define não é o quanto você cai, mas o quanto você se levanta.',
      'Se você pode sonhar, você pode realizar.',
      'O sucesso é a soma de pequenos esforços repetidos dia após dia. - R. Collier',
      'A chave do sucesso é acreditar no seu próprio potencial.',
      'Grandes realizações começam com pequenos passos.',
      'Sua determinação e persistência são suas maiores armas.',
      'O impossível só é impossível até que alguém o faça.',
      'Não deixe o medo decidir o que você não pode fazer.',
      'A vida é um campo de oportunidades. Agarre a sua!',
      'Lembre-se: a jornada é tão importante quanto o destino.',
      'A maior glória em viver está em nunca cair, mas em levantar-se sempre após cada queda.',
      'Pessoas vencedoras não são aquelas que nunca falham, mas aquelas que nunca desistem.',
      'Não deixe que seus medos sejam maiores que seus sonhos.',
      'O sucesso nasce do querer, da determinação e persistência em se chegar a um objetivo.',
      'Nunca é tarde demais para ser o que você poderia ter sido.',
      'Você é mais forte do que pensa, mais capaz do que imagina.',
      'Não limite seus desafios, desafie seus limites.',
      'O que importa não é o tamanho do passo, mas a direção dele.',
      'Seja a mudança que você quer ver no mundo.',
      'Não desista, o começo é sempre o mais difícil.',
      'Lembre-se: até o mais longo dos caminhos começa com um simples passo.',
      'O sucesso é a soma de pequenos esforços repetidos dia após dia.',
      'Acredite nos seus sonhos e lute por eles.',
      'Não espere por oportunidades, crie-as.',
      'A jornada pode ser difícil, mas o resultado vale a pena.',
      'O maior prazer na vida é fazer aquilo que as pessoas dizem que você não é capaz.',
      'Nada é impossível para aquele que persiste.',
      'Grandes coisas nunca vêm de zonas de conforto.',
      'A persistência é o caminho do êxito.',
      'Acredite: você é capaz de alcançar tudo o que deseja.',
      'A determinação é a chave para desbloquear suas metas mais ambiciosas.',
      'Seja gentil consigo mesmo. O autoamor é essencial para o sucesso.',
      'Cada passo em direção aos seus sonhos é uma vitória.',
      'Não espere por oportunidades, crie-as com sua determinação.',
      'Seja a inspiração que você procura no mundo.',
      'Acredite no poder dos seus sonhos. Eles podem se tornar realidade.',
      'Lembre-se: até mesmo os pequenos progressos são vitórias.',
      'Suas ações hoje moldam o amanhã que você deseja.',
      'O sucesso não é uma linha reta, é uma jornada cheia de aprendizados.',
      'Não permita que o medo impeça você de seguir em frente.',
      'Você é mais forte do que imagina. Acredite nisso!',
      'Cada dia é uma página em branco, escreva uma história inspiradora.',
      'A mudança começa com uma decisão. Decida alcançar seus objetivos.',
      'Sua determinação e foco são seus maiores aliados.',
      'Acredite: o universo conspira a favor de quem acredita nos seus sonhos.',
      'O sucesso é a soma de pequenos esforços repetidos dia após dia.',
      'Acredite em você mesmo e tudo será possível.',
      'O fracasso é apenas uma oportunidade para recomeçar com mais inteligência.',
      'A persistência é o caminho do êxito.',
      'Quanto maior a dificuldade, maior será a glória.',
      'O único modo de fazer um excelente trabalho é amar o que você faz.',
      'Não espere por oportunidades, crie-as.',
      'A vida é sobre criar oportunidades, não apenas esperar por elas.',
      'Sua determinação em alcançar seus objetivos determinará seu sucesso.',
      'Cada sonho que você deixa para trás é um pedaço do seu futuro que deixa de existir.',
      'O sucesso é a soma de pequenos esforços repetidos dia após dia.',
      'Não desista, a persistência é o caminho do êxito.',
      'O segredo do sucesso é começar antes de estar pronto.',
      'Lembre-se: você é mais forte do que pensa e será mais bem-sucedido do que imagina.',
      'A chave para o sucesso é começar antes que você esteja pronto.',
      'Não se preocupe com falhas, se preocupe com as chances que você perde quando nem sequer tenta.',
      'O sucesso nasce do querer, da determinação e persistência em se chegar a um objetivo.',
      'Não tenha medo de desistir do bom para perseguir o ótimo.',
      'A verdadeira medida de sucesso é quantas vezes você pode se recuperar do fracasso.',
      'Quando você acredita, tudo é possível.',
      'Acredite em você mesmo e no que você é capaz de fazer.',
      'Se você quer algo que nunca teve, então precisa fazer algo que nunca fez.',
      'Pare de adiar e comece a agir.',
      'Grandes coisas nunca vêm de conforto, elas vêm de sair da zona de conforto.',
      'Você é mais forte do que pensa e será mais bem-sucedido do que imagina.',
      'Seja tão bom que não possam te ignorar.',
      'A jornada de mil milhas começa com um único passo.',
      'O otimismo é a fé em ação. Nada se pode fazer sem esperança e confiança.',
      'Quando tudo parecer estar indo contra você, lembre-se que o avião decola contra o vento, não a favor dele.',
      'Quando a vida coloca obstáculos no seu caminho, lembre-se, no campo da aviação, decolar contra o vento é o que faz você voar mais alto.',
      'Acredite nos seus sonhos e eles se tornarão realidade.',
      'Sucesso é a soma de pequenos esforços repetidos dia após dia.',
      'Não existe elevador para o sucesso. Você precisa subir degrau por degrau.',
      'A chave para o sucesso é começar antes que você esteja pronto.',
      'A jornada de mil milhas começa com um único passo.',
      'Se você acredita, tudo é possível.',
      'Grandes coisas nunca vêm de conforto, elas vêm de sair da zona de conforto.',
      'Não tema falhar, tema ficar na mesma.',
      'Quando você acredita, tudo é possível.',
      'A diferença entre o impossível e o possível está na determinação da pessoa.',
      'Não importa o quão devagar você vá, desde que você não pare.',
      'Faça hoje o que os outros não querem e viva amanhã como os outros não podem.',
      'Lembre-se: você é mais forte do que pensa.',
      'Não se preocupe com falhas, se preocupe com as chances que você perde quando nem sequer tenta.',
      'O sucesso é a soma de pequenos esforços repetidos dia após dia.',
      'Se você quer algo que nunca teve, então precisa fazer algo que nunca fez.',
      'Não se concentre nos obstáculos, concentre-se nos objetivos.',
      'A determinação é a chave para alcançar o que você almeja.',
      'Quanto maior a dificuldade, maior será a glória.',
      'Nunca é tarde demais para ser aquilo que você sempre desejou ser.',
      'O sucesso não é a chave para a felicidade. A felicidade é a chave para o sucesso.',
      'Acredite em você mesmo e no seu potencial.',
      'O primeiro passo para o sucesso é acreditar que você pode.',
      'O sucesso não é definitivo, o fracasso não é fatal: é a coragem de continuar que conta.',
      'A vida é curta, aproveite cada momento e siga atrás dos seus sonhos.',
      'Acredite em si mesmo. Você é mais forte do que pensa.',
      'O otimismo é a fé em ação. Mantenha-se otimista.',
      'Sucesso não é a chave para a felicidade. Felicidade é a chave para o sucesso. Se você ama o que faz, será bem-sucedido.',
      'Nunca é tarde demais para ser o que você poderia ter sido.',
      'A persistência é o segredo do sucesso.',
      'Seja a mudança que você deseja ver no mundo.',
      'Você é capaz de coisas incríveis.',
      'Pequenos passos todos os dias te levarão a grandes conquistas.',
      'Quanto maior o obstáculo, maior a glória em superá-lo.',
      'Não deixe o medo te impedir de realizar seus sonhos.',
      'Acredite: você é capaz de ir além do que imagina.',
      'As limitações estão apenas na sua mente.',
      'Lembre-se: o que você faz hoje pode melhorar todos os seus amanhãs.',
      'O fracasso é apenas uma oportunidade para recomeçar de novo, de forma mais inteligente.',
      'Você é mais forte do que seus desafios.',
      'A jornada pode ser difícil, mas a vitória será gratificante.',
      'Não pare até se orgulhar de si mesmo.',
      'Não desista. Amanhã pode ser o dia da sua vitória.',
      'Você é único e isso é a sua força.',
      'Acredite no processo. Seu tempo vai chegar.',
      'Seja determinado, não desanimado.',
      'Não conte os dias, faça os dias contarem.',
      'Seja a melhor versão de si mesmo.',
      'Você tem o poder de criar a sua própria sorte.',
      'Acredite: tudo vai dar certo no final.',
      'A persistência é o caminho do êxito.',
      'A gratidão transforma o que temos em suficiente.',
      'O sucesso vem para aqueles que nunca desistem.',
      'Você é mais corajoso do que imagina.',
      'Cada pequeno passo te aproxima do seu objetivo.',
      'Lembre-se: você é capaz de superar qualquer obstáculo.',
      'Não deixe que o medo te impeça de tentar.',
      'Você é capaz de transformar desafios em oportunidades.',
      'Grandes coisas nunca vêm de zonas de conforto.',
      'O importante é seguir em frente, não importa o quão devagar.',
      'Acredite na jornada, não apenas no destino final.',
      'Você é mais resiliente do que imagina.',
      'Tudo que você precisa está dentro de você.',
      'Seja persistente e os resultados virão.',
      'Não pare até se orgulhar de si mesmo.',
      'A vida é feita de tentativas. Continue tentando.',
      'Lembre-se: o que importa é a progressão, não a perfeição.',
      'Você é capaz de alcançar o impossível.',
      'Não desista. Os desafios preparam você para a vitória.',
      'Acredite: cada passo te aproxima do seu objetivo.',
      'Você é mais forte do que os seus obstáculos.',
      'A persistência é a chave para transformar sonhos em realidade.',
      'Não subestime seu potencial.',
      'Cada novo dia é uma nova oportunidade para recomeçar.',
    ];

    const days: Date[] = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < days_to_send; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }

    days.map(async day => {
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];

      await this.emailRepository.create({
        message: randomMessage,
        user_id,
        date_to_send: day,
      });
    });
  }
}

export { FillEmailService };
