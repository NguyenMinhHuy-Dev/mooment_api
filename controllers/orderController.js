const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Voucher = require("../models/voucherModel");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const orderController = {
    createOrder: async (req, res) => {
        try {
            const { isAuth, ...data } = req.body;
            const order = new Order(data);
            const savedOrder = await order.save();

            if (isAuth) {
                const user = await User.findOne({ email: req.body.customerEmail });
                await user.updateOne({ $push: { orders: savedOrder._id } });
            }   

            for (const product of order.orderDetail) {
                await Product.findOneAndUpdate({ slug: product.slug }, { $inc: { quantity: - product.quantity, sold: + product.quantity } });
            } 
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user:  process.env.NODEMAIL_USER,
                    pass: process.env.NODEMAIL_PASS
                }
            }) 

            var mailOptions = {
                from: process.env.NODEMAIL_USER,
                to: req.body.customerEmail,
                subject: 'Đơn hàng của bạn | Mooment Store',
                html: `
                    <div class="componenttoprint"> 
                        <div style="width: 100%; min-height: 600px; padding: 10px;">
                            <div style="width: 100%; display: flex; justify-content: space-between; align-items: center;">
                                <img src="/favicon.ico" alt="logo Mooment" width="100" height="100">
                                <div class="w-[300px] flex flex-col items-start" style="display: flex; flex-direction: column; align-items: flex-start;">
                                    <div class="w-full uppercase text-[25px] tracking-widest font-black text-center" style="width: 100%; text-transform: uppercase; font-size: 40px; letter-spacing: 5px; color: rgb(0, 0, 0); font-weight: 900; text-align: center;">
                                        Mooment store
                                    </div>
                                <span class="text-[14px] w-full flex items-center justify-between">
                                    Số hóa đơn: <strong> ${savedOrder._id}</strong> 
                                </span>
                                <span class="text-[14px] w-full flex items-center justify-between">
                                    Ngày: <span>${(new Date(savedOrder.createdAt)).toLocaleString('vi-VN')}</span>
                                </span>
                            </div>
                        </div>
                        <div class="w-full">
                            <div class="w-full">
                                <span class="text-[14px]"> Tên khách hàng      </span>
                                <span class="text-[14px]"> : ${savedOrder.customerName}</span>
                            </div>
                            <div class="w-full">
                                <span class="text-[14px]"> Số điện thoại      </span>
                                <span class="text-[14px]"> : ${savedOrder.customerPhoneNumber}</span>
                            </div>
                            <div class="w-full">
                                <span class="text-[14px]"> Địa chỉ      </span>
                                <span class="text-[14px]"> : ${savedOrder.customerAddress}</span>
                            </div>
                        <div class="w-full">
                        <span class="text-[14px]">
                        Ghi chú      </span>
                        <span class="text-[14px]">
                        : ${savedOrder.note}</span>
                        </div>
                        </div>
                        <div class="w-full mt-5" style="width: 100%; margin: 20px 0px;">
                        <table class="mytable2 w-full" style="width: 100%;">
                        <thead>
                        <tr>
                        <th class="text-center">
                        STT</th>
                        <th>
                        Tên sản phẩm</th>
                        <th>
                        Đơn vị tính</th>
                        <th>
                        Số lượng</th>
                        <th>
                        Đơn giá</th>
                        <th>
                        Tổng tiền</th>
                        <th>
                        Ghi chú</th>
                        </tr>
                        </thead>
                        <tbody>
                            ${savedOrder.orderDetail.map((item, index) => (
                                `
                                    <tr>
                                        <td class="text-center">${index + 1}</td>
                                        <td>${item.name}</td>
                                        <td class="text-center">Cái</td>
                                        <td class="text-center">${item.quantity}</td>
                                        <td class="text-right">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.salePrice)}</td>
                                        <td class="text-right">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalPrice)}</td>
                                        <td></td>
                                    </tr>
                                `
                            ))}
                            
                            <tr>
                                <td colspan="5" class="text-right">Voucher giảm giá</td>
                                <td class="text-right">${savedOrder.voucher}</td>
                                <td class="text-right"></td>
                            </tr>
                            <tr>
                                <td colspan="5" class="text-right">Phí vận chuyển</td>
                                <td class="text-right">Miễn phí</td>
                                <td class="text-right"></td>
                            </tr>
                            <tr>
                                <td colspan="5" class="text-right uppercase font-bold" style="text-transform: uppercase; font-weight: bold;">
                                    Tổng tiền
                                </td>
                                <td colspan="2" class="text-center">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(savedOrder.totalCost)}</td>
                            </tr>
                            <tr>
                        </tbody>
                        </table>
                        </div>
                        </div>
                        </div>
                `
            }; 

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                    res.redirect('/');
                } else {
                    console.log('Email sent: ' + info.response);
                    res.redirect('/');
                }
            });  

            return res.status(200).json({status: 200, message: "Create order successfull!", data: savedOrder});
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    updateOrder: async(req, res) => {
        try {
            await Order.findByIdAndUpdate(req.params.id, { $set: req.body});
            return res.status(200).json("Update successfull");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find();
            return res.status(200).json(orders);
        }
        catch(err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = orderController;