import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    nom: {
        type: String,
        required:true
    },
    prenoms:{
        type: String,
        required:true
    },
   cellulaire:{
       type: Number,
       required: true,
       max: 10
   },
   mail:{
       type: String,
       required: false
   },
   adresse_geographique:{
       type: String,
       required: true

   },
   reference_contrat:{
       type: Number,
       max: 9,
       min:9
       

   },
   motif: {
       required:true,
       type:Array
   },

   description:{
       type: String,


   },
   photo:{
       
       
       
   }


},
{timestamps: true});

/*
|--------------------------------------------
| ADDITIONAL SCHEMAS APPEAR HERE
|--------------------------------------------
*/
export const MainModel = mongoose.model('mainCollection', clientSchema);
clientSchema.path('_id')
