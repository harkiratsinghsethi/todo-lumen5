export const filterTodos =(allTodoItems,selectedCategory)=>{
   return selectedCategory ? allTodoItems.filter(item => item.CATEGORY === selectedCategory) : allTodoItems
}
