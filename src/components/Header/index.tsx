import { FiPlusSquare } from "react-icons/fi"

import { Container } from "./styles"
import Logo from "../../assets/logo.svg"

interface HeaderProps {
  setOpenModal: (openModal: boolean) => void
  openModal: boolean
}

const Header = ({ setOpenModal, openModal }: HeaderProps) => {
  return (
    <Container>
      <header>
        <img src={Logo} alt="GoRestaurant" />
        <nav>
          <div>
            <button type="button" onClick={() => setOpenModal(!openModal)}>
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  )
}

export default Header
