const {functions,cors,firestore,successResponseGet,errorResponse,} = require('./admin.js')

const getCategory = require('./category')
const {getCustomerList,getCustomer,updateCustomerInfo,addCustomer,} = require('./customer.js')
const {getFeedbackList,addFeedback,removeFeedback,} = require('./feedback.js')
const {addAccount,isUsernameTaken,isEmailTaken,getAccountList,login,getAccountByUsername,loginToAdmin,removeAccount,} = require('./account.js')
const {addProduct,getProductList,getProductListByCategoryname,searchProductByName,removeProduct,} = require('./product.js')
const {getOrderList,getOrderByOrderID,updateOrderStatus,removeOrder,} = require('./order.js')
const {addProductToCartByUsername,getCartByUsername,checkoutByUsername,removeProductFromCart,} = require('./cart.js')
const {getPayment,addPayment,removePayment,} = require('./payment.js')

var productsRef = firestore.collection('products')

//Account
exports.addAccount = functions.https.onRequest(addAccount)
exports.isUsernameTaken = functions.https.onRequest(isUsernameTaken)
exports.isEmailTaken = functions.https.onRequest(isEmailTaken)
exports.getAccountList = functions.https.onRequest(getAccountList)
exports.login = functions.https.onRequest(login)
exports.loginToAdmin = functions.https.onRequest(loginToAdmin)
exports.getAccountByUsername = functions.https.onRequest(getAccountByUsername)
exports.removeAccount = functions.https.onRequest(removeAccount)

//Customer
exports.getCustomerList = functions.https.onRequest(getCustomerList)
exports.addCustomer = functions.https.onRequest(addCustomer)
exports.updateCustomerInfo = functions.https.onRequest(updateCustomerInfo)
exports.getCustomer = functions.https.onRequest(getCustomer)

//Product
exports.addProduct = functions.https.onRequest(addProduct)
exports.getProductList = functions.https.onRequest(getProductList)
exports.getProductListByCategoryname = functions.https.onRequest(getProductListByCategoryname)
exports.searchProductByName = functions.https.onRequest(searchProductByName)
exports.removeProduct = functions.https.onRequest(removeProduct)


//Category
exports.getCategory = functions.https.onRequest(getCategory)

//Orders
exports.getOrderList = functions.https.onRequest(getOrderList)
exports.getOrderByOrderID = functions.https.onRequest(getOrderByOrderID)
exports.updateOrderStatus = functions.https.onRequest(updateOrderStatus)
exports.removeOrder = functions.https.onRequest(removeOrder)


//carts
exports.addProductToCartByUsername = functions.https.onRequest(addProductToCartByUsername)
exports.getCartByUsername = functions.https.onRequest(getCartByUsername)
exports.checkoutByUsername = functions.https.onRequest(checkoutByUsername)
exports.removeProductFromCart = functions.https.onRequest(removeProductFromCart)

//feedback
exports.getFeedbackList = functions.https.onRequest(getFeedbackList)
exports.addFeedback = functions.https.onRequest(addFeedback)
exports.removeFeedback = functions.https.onRequest(removeFeedback)

//payment
exports.getPayment = functions.https.onRequest(getPayment)
exports.addPayment = functions.https.onRequest(addPayment)
exports.removePayment = functions.https.onRequest(removePayment)








