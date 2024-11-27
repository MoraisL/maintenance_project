

interface TitleInterface {
    text? :string;
}

export default function Title({text}: TitleInterface){
    return(
        <h1 className="text-4xl font-bold uppercase w-full bg-white/40 p-6 text-center">
            {text}
          </h1>
    )
}