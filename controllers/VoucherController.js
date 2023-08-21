const Voucher = require("../models/voucherModel");

const voucherController = {
    getAllVouchers: async (req, res) => {
        try {
            const vouchers = await Voucher.find();
            return res.status(200).json(vouchers);
        }
        catch(err) {
            return res.status(500).json(err);
        }
    },

    addVoucher: async (req, res) => {
        try {
            const voucher = new Voucher(req.body);
            const savedVoucher = await voucher.save();
            return res.status(200).json(savedVoucher);
        }
        catch(err) { 
            return res.status(500).json(err);
        } 
    }
};

module.exports = voucherController;