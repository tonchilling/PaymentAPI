using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DTO.Transactions;
using DTO.Util;
using BAL.Transactions;

namespace API.Controllers
{
    [RoutePrefix("api/PaymentAPI")]
    public class  PaymentAPIController : ApiController
    {
        List<MessageDTO> results = new List<MessageDTO>();
        HttpResponseMessage mapMessage = null;
        T_CardValidationBAL validateBAL = null;
        T_CreditCardDTO tranDto = null;


        public PaymentAPIController()
        {
            

        }

        [HttpPost]
        [Route("Submit")]
        public HttpResponseMessage Payment()
        {
            validateBAL = new T_CardValidationBAL();
          

         


            try
            {
                // zoneDTO = ConvertX.GetReqeustForm<M_ZoneDTO>();
                tranDto = ConvertX.GetReqeustForm<T_CreditCardDTO>();



                results = validateBAL.Validate(tranDto);

                mapMessage = Request.CreateResponse(HttpStatusCode.OK, results);
            }
            catch (Exception ex)
            {
                mapMessage = Request.CreateResponse(HttpStatusCode.BadRequest, ex.ToString());
            }
            finally


            { }

            return mapMessage;
        }
    }
}
