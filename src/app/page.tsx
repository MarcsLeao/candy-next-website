import { Home } from "../components/home/Home"
import { Main } from "../components/home/Main"
import { Nav } from "../components/home/Nav"

export default function HomePage() {

  return (
    <>
        <Main>
          <Nav />
          <Home />
        </Main>  
    </>
  )
}
