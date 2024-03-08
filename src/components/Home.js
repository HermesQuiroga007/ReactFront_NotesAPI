import React from 'react'

const Home = () => {
  return (
    <div>
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Bienvenido al proyecto de Notas</h1>
            <p className="lead fw-normal text-white-50 mb-0">Implementando .NET core y React Native</p>
          </div>
        </div>
      </header>
      <section className="py-1" style={{ backgroundColor: '#D6EFF6' }}>
        <div className="container px-3 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <div className="col mb-5">
              <div className="card h-100 bg-dark text-white">
                <img className="card-img-top" src="https://w0.peakpx.com/wallpaper/165/963/HD-wallpaper-c-sharp-c-code-c-programmer-code-developers.jpg" alt="..." />
                <div className="card-body p-4">
                  <div className="text-center">
                    <h5 className="fw-bolder">C#</h5>
                    <p className="fw-normal">C# y .NET Core para el BackEnd</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col mb-5">
              <div className="card h-100 bg-dark text-white">
                <img className="card-img-top" src="https://midu.dev/images/wallpapers/javascript-small-vertical-4k.png" alt="..." />
                <div className="card-body p-4">
                  <div className="text-center">
                    <h5 className="fw-bolder">JS</h5>
                    <p className="fw-normal">Implementado para ejecutar las vistas y trabajar junto a React.js</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col mb-5">
              <div className="card h-100 bg-dark text-white">
                <img className="card-img-top" src="https://w0.peakpx.com/wallpaper/836/1016/HD-wallpaper-react-react-js.jpg" alt="..." />
                <div className="card-body p-4">
                  <div className="text-center">
                    <h5 className="fw-bolder">React</h5>
                    <p className="fw-normal">Framework implementado para el FrontEnd</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Add more cards here */}
          </div>
        </div>
      </section>
      <footer className="py-4 f1 bg-dark">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <p className="mb-0">¡Happy Hacking!</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;