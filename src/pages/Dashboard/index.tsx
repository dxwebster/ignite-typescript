import { useState, useEffect } from "react"
import Header from "../../components/Header"
import api from "../../services/api"
import FoodCard from "../../components/Food"
import ModalAddFood from "../../components/ModalAddFood"
import ModalEditFood from "../../components/ModalEditFood"
import { FoodsContainer } from "./styles"
import { Food } from "../../interfaces/Food"

const Dashboard = () => {
  const [foods, setFoods] = useState<Food[]>([])
  const [editingFood, setEditingFood] = useState<Food | any>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)

  useEffect(() => {
    async function getFoods() {
      const response = await api.get("/foods")
      setFoods(response.data)
    }

    getFoods()
  }, [])

  const handleAddFood = async (food: Food) => {
    try {
      const response = await api.post("/foods", { ...food, available: true })

      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateFood = async (food: Food) => {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, { ...editingFood, ...food })

      const foodsUpdated = foods.map(f => (f.id !== foodUpdated.data.id ? f : foodUpdated.data))

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`)

    const foodsFiltered = foods.filter((food: Food) => food.id !== id)

    setFoods(foodsFiltered)
  }

  const handleEditFood = (food: Food) => {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  return (
    <>
      <Header openModal={openModal} setOpenModal={setOpenModal} />

      <ModalAddFood isOpen={openModal} setIsOpen={setOpenModal} handleAddFood={handleAddFood} />

      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={setEditModalOpen}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods?.map((food: Food) => (
          <FoodCard key={food.id} food={food} handleDelete={handleDeleteFood} handleEditFood={handleEditFood} />
        ))}
      </FoodsContainer>
    </>
  )
}

export default Dashboard
