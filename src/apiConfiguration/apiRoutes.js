const POST = 'POST'
const GET = 'GET'
const DELETE = 'DELETE'
const PUT = 'PUT'

const GetProduct = (productId) => {
  return { method: GET, url: `products/get-product/${productId}` }
}
const DeleteProduct = (productId) => {
  return { method: DELETE, url: `products/delete-product/${productId}` }
}
const EditProduct = (productId) => {
  return { method: PUT, url: `products/update-product/${productId}` }
}

const GetMessages = (conversationId) => {
  return { method: GET, url: `conversation/get-messages/${conversationId}` }
}

export default {
  //Locations
  GetLocations: { method: GET, url: 'locations' },

  //Auth
  Signup: { method: POST, url: 'user/register' },
  Signin: { method: POST, url: 'user/login' },

  //Products
  CreateProduct: { method: POST, url: 'products/create-product' },
  GetProducts: { method: GET, url: 'products' },
  GetFilteredProducts: { method: POST, url: 'products/search-products' },
  GetProduct,
  DeleteProduct,
  EditProduct,
  GetProductsByUser: { method: GET, url: 'products/my-products' },

  //User
  GetUser: { method: GET, url: 'user/get-user' },
  UpdateUser: { method: PUT, url: 'user/update-profile' },

  //Conversation
  CreateChatRoom: { method: POST, url: 'conversation/create-chatroom' },
  CreateMessage: { method: POST, url: 'conversation/create-message' },
  GetMessages,
  GetUserConversations: { method: GET, url: 'conversation/get-user-conversations' }
}
