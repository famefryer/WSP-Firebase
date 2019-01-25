var {firestore,cors,successResponseGet,errorResponse,} = require('./admin.js')
var ordersRef = firestore.collection('orders')

const getOrderList = ((req,res) => {
    return cors(req,res,()=>{
        if(req.method === 'GET'){
            var orderList = ordersRef.get()
                .then(snapshot => {
                    let res_data = {}
                    res_data['return_code'] = '200'
                    res_data['descrip'] = 'success to get the list of orders'
                    orders = []
                    snapshot.forEach(doc => {
                        let eachOrder = doc.data()
                        eachOrder['orderID'] = doc.id
                        orders.push(eachOrder)
                    })
                    res_data['orders'] = orders 
                    successResponseGet(res,res_data)
                    return snapshot
                }).catch(err=>{
                    errorResponse(res,err.details)
                })
        } else {
            errorResponse(res,"Error request method")
        }
    })
})

const getOrderByOrderID = ((req,res) => {
    return cors(req,res,()=>{
        if(req.method === 'POST'){

            let orderID = req.get('orderID')

            var getOrder = ordersRef.doc(orderID).get()
                .then(ref => {
                    if(ref.exists){
                        let res_data = {}
                        res_data['return_code'] = '200'
                        res_data['descrip'] = 'Success to get the order from an orderID'
                        res_data['order'] = ref.data()
                        res_data['order'].orderID = ref.id
                        successResponseGet(res,res_data)
                    }else {
                        errorResponse(res,orderID+' not found in database.')
                    }
                    return ref
                }).catch(err=>{
                    errorResponse(res,err.details)
                })
        } else {
            errorResponse(res,"Error request method")
        }
    })
})

const updateOrderStatus = ((req,res) => {
    return cors(req,res,()=>{
        if(req.method === 'POST'){

            let orderID = req.get('orderID')
            let orderStatus = req.get('orderStatus')
            
            updateData = {}
            var updateOrder = ordersRef.doc(orderID).get()
            .then(ref=>{
                if(ref.exists){                    
                    updateData = ref.data()
                    updateData['orderStatus'] = orderStatus
                }else {
                    throw new Error(orderID+' not found in database.')
                }
                return ordersRef.doc(orderID).set(updateData)
            })
            .then(ref => {
                let res_data = {}
                res_data['return_code'] = '200'
                res_data['descrip'] = 'Success to update the status of '+orderID
                successResponseGet(res,res_data)
                return ref
            }).catch(err=>{
                errorResponse(res,err.details)
            })
        } else {
            errorResponse(res,"Error request method")
        }
    })
})

const removeOrder = function (req,res){
    return cors(req,res,()=>{
        if(req.method==='POST'){
            let orderID = req.get('orderID')

            let removeOrder = ordersRef.doc(orderID).delete()
            .then(ref => {
                let res_data = {}
                res_data['return_code'] = '200'
                res_data['descrip'] = 'Success to delete '+orderID+' from order list.'
                successResponseGet(res,res_data)
                return ref            
            })
            .catch(err=>{
                errorResponse(res,err.details)
            })
        }
        else {
            errorResponse(res,"Error request method")
        }
    })
}

module.exports = {
    getOrderList,getOrderByOrderID,updateOrderStatus,removeOrder,
}

