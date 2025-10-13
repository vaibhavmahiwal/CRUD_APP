import express from 'express';
const router=express.Router();
import Person from './../models/person.js';

router.post('/', async (req, res) => {
  try {
    console.log(' Incoming data:', req.body); 
    const person = new Person(req.body);
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (err) {
    console.error(' Error saving person:', err); // 
    res.status(500).json({ error: 'internal server error' });
  }
});

router.get('/',async(req,res)=>{
  try{
    const data=await Person.find();
    console.log("data fetched successfully");
    res.status(200).json(data);
  }catch(err){
   console.log(err);
   res.status(500).json({error:"internal server error"});
  }
})

router.get('/:workType',async(req,res)=>{
  try{
     const workType=req.params.workType;
     if(workType==='chef'||workType==='manager'||workType==='waiter'){
      const response=await Person.find({work:workType})
      console.log("response fetched");
      res.status(200).json(response);
     }
     else{
      res.status(404).json({
        error:'invalid work type'
      });
     }
  }
    catch(err){
     console.log(err);
     res.status(500).json({error:'internal server error'});
  }
});

router.put('/:id',async(req,res)=>{
       try{
       const personId=req.params.id; //extrct the id from the url parameter
       const updatedPersondata=req.body;
       const response = await Person.findByIdAndUpdate(
  personId,
  updatedPersondata,
  {
    new: true,            // return the updated document
    runValidators: true,  // run mongoose validation
  }
);
       if(!response){
        return res.status(404).json({error:'person not found'});
       }
       console.log('data updated')
       res.status(200).json(response)
       }
       catch(err){
           console.log(err);
           res.status(500).json({error:'internal server error'});
       }
});
 
router.delete('/:id',async(req,res)=>{
  try{
    const personId=req.params.id; 
    const response=await Person.findbyIdandRemove(personId);
   if(!response){
    return res.status(404).json({error:'person not found'});
   }
   console.log('data delete');
   res.status(200).json({message:'person deleted successfully'});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
});
  
export default router;
``
