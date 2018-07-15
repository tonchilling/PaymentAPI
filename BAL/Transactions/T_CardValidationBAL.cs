using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DAL.Transaction;
using DTO.Util;
using DTO.Transactions;
/// <summary>
/// 
/// </summary>
/// 
namespace BAL.Transactions
{
    public class  T_CardValidationBAL : BaseBL
    {
        bool isCan = false;
         T_CardValidationDAL dao = null;
        T_CreditCardDAL cardDao = null;
        List<T_CardValidationDTO> dtolist = null;
        List<MessageDTO> responseList = null;
        public  T_CardValidationBAL()
        {
            dao = new  T_CardValidationDAL();
            cardDao = new T_CreditCardDAL();
        }



        public override bool Action()
        {
            dao = new  T_CardValidationDAL();

            return isCan;
        }

        public override bool Add(object dto)
        {
            bool isCan = false;

            try {

                isCan = dao.Add(dto);
            }
            catch (Exception ex)
            {
                Log((dto as  T_CardValidationDTO).Page, "Error", ex.ToString());
            }
            return isCan;
        }

        public override bool Update(object dto)
        {
            return dao.Update(dto);
        }


     




        public override bool Delete(object dto)
        {
            return dao.Delete(dto);
        }

        public override System.Data.DataTable FindByAll()
        {
            
            return dao.FindByAll();
        }




        public T_CardValidationDTO FindByPK(object dto)
        {


            // return null;
            return dao.FindByPK(dto);
        }





        public List<MessageDTO> Validate(object dto)
        {

            responseList = new List<MessageDTO>();
            MessageDTO errorMsg = null;
            T_CreditCardDTO requestDto = (T_CreditCardDTO)dto;
            T_CreditCardDTO responseDto = null;
            string fieldValue = "";
            string format = "";
            string opValue = "";

            bool invalidCreditCard = false;


            try
            {

                dtolist =  dao.FindByCardTypeObjList(dto);

                #region Validate from DB
                foreach (T_CardValidationDTO validateDto in dtolist)
            {

                opValue = validateDto.OperationValue;
                if (validateDto.Field == "CardNumber")
                {
                    fieldValue = requestDto.CardNumber;
                }
                else if (validateDto.Field == "ExpireDate")
                {
                    fieldValue = requestDto.ExpireDate.PadLeft(6,'0');

                        

                }
                switch (validateDto.ChkValidate)
                {
                    case ChkValidate.Value:


                           
                          
                            if (!ConvertX.Compare(validateDto.Operation, opValue, fieldValue, validateDto.CompareValue))
                        {
                            errorMsg = new MessageDTO();
                            errorMsg.Status = false;
                            errorMsg.StatusText = validateDto.InvalidCaption;
                            responseList.Add(errorMsg);
                        }

                        break;
                    case ChkValidate.SubString:


                        fieldValue = fieldValue.Substring(validateDto.StartLength, validateDto.Length);
                        if (!ConvertX.Compare(validateDto.Operation, opValue, fieldValue, validateDto.CompareValue))
                        {
                            errorMsg = new MessageDTO();
                            errorMsg.Status = false;
                            errorMsg.StatusText = validateDto.InvalidCaption;
                            responseList.Add(errorMsg);
                        }
                        break;
                    case ChkValidate.Length:
                        fieldValue = fieldValue.Length.ToString();
                        if (!ConvertX.Compare(validateDto.Operation, opValue, fieldValue, validateDto.CompareValue))
                        {
                            errorMsg = new MessageDTO();
                            errorMsg.Status = false;
                            errorMsg.StatusText = validateDto.InvalidCaption;
                            responseList.Add(errorMsg);
                        }
                        break;
                }
            }

                #endregion

                responseDto = cardDao.Existing(requestDto);

            invalidCreditCard = true;

                #region Validate from Program
                if (responseDto != null)
            {
                if (responseDto.HolderName.Trim() != requestDto.HolderName.Trim())
                {
                    invalidCreditCard = false;
                }
                else if (responseDto.CTypeCode.Trim() != requestDto.CTypeCode.Trim())
                {
                    invalidCreditCard = false;

                }
                else if (responseDto.ExpireDate.Trim() != requestDto.ExpireDate.Trim())
                {
                    invalidCreditCard = false;

                }
                else if (responseDto.CVV.Trim() != requestDto.CVV.Trim())
                {
                    invalidCreditCard = false;

                }

                if (!invalidCreditCard)
                {
                    errorMsg = new MessageDTO();
                    errorMsg.Status = false;
                    errorMsg.StatusText = "Invalid";
                    responseList.Add(errorMsg);
                }

                    #endregion

                }
            else {
                errorMsg = new MessageDTO();
                errorMsg.Status = false;
                errorMsg.StatusText = "Does not exist";
                responseList.Add(errorMsg);
            }



            }
            catch (Exception ex)
            {
                Log((dto as T_CreditCardDTO).Page, "Error", ex.ToString());
            }
         
            return responseList;
        }



        public List< T_CardValidationDTO> FindByObjList(object dto) 
        {

           
           // return null;
            return dao.FindByObjList(dto);
        }

     

        public override System.Data.DataTable FindByColumn(object data)
        {
            throw new NotImplementedException();
        }
    }
}