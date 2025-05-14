import Customer from "../models/Customer.js";

export const createCustomer = async (req,res) =>{
    try {
        const { empCode, firstName, lastName, initialsName, contact, address } = req.body;

        const newCustomer = new Customer({
            empCode,
            firstName,
            lastName,
            initialsName,
            contact,
            address
        });

        await newCustomer.save();
        res.status(201).json({ message: "Customer created successfully", customer: newCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create customer", error: error.message });
    }
};

export const getAllCustomers = async (req, res) => {
    try {
      const { search } = req.query;
      let query = {};
  
      if (search) {
        const searchRegex = new RegExp(search, 'i'); 
        query = {
          $or: [
            { empCode: { $regex: searchRegex } },
            { firstName: { $regex: searchRegex } },
            { lastName: { $regex: searchRegex } },
          ],
        };
      }
  
      const customers = await Customer.find(query).sort({ createdAt: -1 });
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch customers", error: error.message });
    }
  };

  export const updateCustomer = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
        new: true, 
        runValidators: true, 
      });
  
      if (!updatedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      res.status(200).json({ message: 'Customer updated successfully', customer: updatedCustomer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update Customer', error: error.message });
    }
  };

  export const deleteCustomer = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedCustomer = await Customer.findByIdAndDelete(id);
  
      if (!deletedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete Customer', error: error.message });
    }
  };