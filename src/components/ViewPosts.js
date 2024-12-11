import React from "react";
import Header from "./Header";
import NovoPost from "./NovoPost";

function ViewPosts() {
    const post = {
        title: "A Importância da Matemática",
        disciplina: "Matemática",
        image: "https://via.placeholder.com/300",
        descricao: "A matemática está presente em todos os aspectos da nossa vida cotidiana.",
    };

    return (
        <>
            <Header />
            <div className="bg-gray-100 h-[100dvh]">
                <NovoPost title="Publicação" />
                <div>
                    <h2 className="ml-24 mt-36 text-2xl font-bold text-gray-600">{post.title}</h2>

                    <span className="inline-block ml-24 mt-4 px-4 py-2 text-sm font-medium text-white bg-violet-600 border border-violet-600 rounded-3xl">
                        {post.disciplina}
                    </span>
                </div>
                <div className="flex justify-center px-4 py-8 mt-10">
                    <div className="bg-white shadow-md rounded-lg p-6 w-1/3 mb-6 mr-6">
                        <img
                            src={post.image}
                            alt="Imagem da publicação"
                            className="w-1/2 h-auto object-cover rounded-md"
                        />
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 w-1/3">
                        <p className="text-black font-semibold">{post.descricao}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewPosts;
