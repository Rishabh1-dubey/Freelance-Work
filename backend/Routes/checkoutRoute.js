const exppress = require("express");
const Cart = require("../models/Cart");
const Checkout = require("../models/Checkout")
const Order = require("../models/Order")
const { protect } = require("../middlewares/authMiddleware");

const router = exppress.Router();

//   @Route POST api/checkout
//   @desc create a new checkout session

router.post("/checkout", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;
  if (!checkoutItems || checkoutItems.length === 0) {
   return res.status(401).json({ message: "Not able to find the Product" });
  }
  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    console.log(`Just Checkout the User ${req.user._id}`);
    return res.status(201).json(newCheckout);
  } catch (error) {
    console.log("Error Creating the checkout session",error);
  return  res.status(401).json("Server Error" + error);
  }
});

//   @Route Put api/checkout
//   @desc Uodate checkout session
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentDetails, paymentStatus } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout)
      return res.status(401).json({ message: "Checkout not found" });

    if (paymentStatus == "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();

      await checkout.save();
      res.status(201).json(checkout);
    } else {
   return   res.status(401).json({message:"Invalid Payement Status"});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Server Error"});
  }
});



//   @Route POST api/checkout/:id/finalize
//   @desc Uodate checkout session


router.post("/:id/finalize", protect,async(req,res)=>{
  try {
    
    const checkout = await Checkout.findById(req.params.id)
    if(!checkout){
      return res.status(401).json({message:'Chekout not found'})
    }
if(checkout.isPaid && !checkout.isFinalized){
  // Create final order based on the chekcout details
  const finalOrder = await Order.create({
    user:checkout.user,
    orderItems:checkout.checkoutItems,
    shippingAddress:checkout.shippingAddress,
    paymentMethod:checkout.paymentMethod,
    totalPrice : checkout.totalPrice,
    isPaid:true,
    paidAt:checkout.paidAt,
    isDelivered:false,
    paymentStatus:"paid",
    paymentDetails:checkout.paymentDetails
  
  })

  // Mark the checkout ad finalized
  checkout.isFinalized = true
  checkout.finalizedAt=Date.now();
  await checkout.save()

  // Delete the cart associated with the user
  await Cart.findOneAndDelete({user:checkout.user});
  res.status(201).json(finalOrder)
}else if(checkout.isFinalized){
  res.status(400).json({message:"Checkout already finalized"})
}else{
  res.status(400).json({message:"Checkout id not paid"})
}

  } catch (error) {
    console.log(error);
    res.status(401).json({message:"Server Error" + error});
  }
})
module.exports = router