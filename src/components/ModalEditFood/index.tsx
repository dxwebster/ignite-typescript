import { useRef } from "react"
import { FiCheckSquare } from "react-icons/fi"

import { Form } from "./styles"
import Modal from "../Modal"
import Input from "../Input"
import { Food } from "../../interfaces/Food"

interface ModalEditFoodProps {
  setIsOpen: (isOpen: boolean) => void
  isOpen: boolean
  handleUpdateFood: (data: Food) => void
  editingFood: Food
}

const ModalEditFood = ({ setIsOpen, isOpen, handleUpdateFood, editingFood }: ModalEditFoodProps) => {
  const formRef = useRef<any>()

  const handleSubmit = async (data: Food) => {
    handleUpdateFood(data)
    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={() => setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />
        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />
        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalEditFood
