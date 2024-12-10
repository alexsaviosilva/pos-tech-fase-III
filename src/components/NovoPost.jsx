import React from "react";

function NovoPost( { title } ) {
    return (
        <>
            <div className="bg-slate-100 -mb-40">
                <section className="flex items-center">
                    <h1 className="m-10 ml-24 text-3xl font-semibold">{ title }</h1>
                    <a href='#' className="text-violet-600 decoration-solid ml-auto mr-24">Voltar</a>
                </section>
            </div>
        </>
    )
}

export default NovoPost;