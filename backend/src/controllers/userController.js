import User from "../model/User";

export async  function createUser(req,res) {
    const {email, firstName, lastName, password} = req.body;
    try {
        const existing = User.findOne({email});
        if (existing) return res.status(400).json({message: "Email is already in use."});

        
    } catch (error) {
        
    }
}