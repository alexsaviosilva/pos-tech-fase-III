function Header() {
    return (
        <header>
            <section className="flex items-center justify-center h-16">
                <img src='./MB.jpg' className="ml-10 mr-2 h-8 cursor-pointer"></img>
                <p className="font-regular">MyBlog_Frontend</p>
                <div className="flex items-center ml-auto mr-6">
                    <img src='./profile.png' className="h-6 cursor-pointer"></img>
                    <p className="text-sm ml-2">Eduardo Souza</p>
                    <img src='./Logout.png' className="h-3 mx-2 cursor-pointer"></img>
                </div>
            </section>
        </header>
    );
}

export default Header;