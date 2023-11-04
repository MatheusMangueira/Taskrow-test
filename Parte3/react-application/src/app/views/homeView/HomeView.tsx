import Link from 'next/link';

type ContatProps = {
  id: number;
  href: string;
  name: string;
};

const contat: ContatProps[] = [
  {
    id: 1,
    href: 'https://www.linkedin.com/in/matheusmangueira/',
    name: 'Linkedin'
  },
  {
    id: 2,
    href: 'https://matheus-mangueira.vercel.app/',
    name: 'Site Pessoal'
  },
  {
    id: 3,
    href: 'https://github.com/MatheusMangueira',
    name: 'Github'
  }
];

export const HomeView = () => {
  return (
    <div className="pt-5 w-full">
      <h1 className="text-4xl text-center pb-5">Apresentação</h1>
      <p>
        Olá, meu nome é Matheus Mangueira, sou um desenvolvedor e estou
        extremamente contente pela oportunidade de participar deste processo
        seletivo. Tenho o prazer de apresentar a aplicação que desenvolvi com
        muito cuidado e dedicação, e espero que ela atenda às expectativas da
        equipe da Taskrow. Estou confiante de que fiz o meu melhor e espero que
        isso seja suficiente para que eu possa fazer parte da equipe.
      </p>
      <br />
      <p>
        Estou imensamente empolgado com a possibilidade de me juntar ao time da
        Taskrow e contribuir para o crescimento da empresa. Acredito que esta
        jornada pode ser uma oportunidade incrível para o meu desenvolvimento
        profissional e para agregar valor à equipe.
      </p>
      <div className="py-5">
        <h2 className="font-bold">Informações para contato:</h2>
        <div className="flex flex-col gap-2">
          {contat.map((item) => (
            <Link
              target="_blank"
              className="text-blue-500 hover:underline"
              href={item.href}
              key={item.id}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
