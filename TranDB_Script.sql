USE [TranDB]
GO
/****** Object:  Table [dbo].[M_Log]    Script Date: 07/15/2018 11:30:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[M_Log](
	[LogID] [nvarchar](50) NOT NULL,
	[LogDate] [nvarchar](10) NULL,
	[System] [nvarchar](200) NULL,
	[Page] [nvarchar](200) NULL,
	[Level] [nvarchar](20) NULL,
	[Message] [nvarchar](1000) NULL,
	[Desc] [nvarchar](1000) NULL,
	[CreateDate] [datetime] NULL,
	[CreateBy] [nvarchar](50) NULL,
 CONSTRAINT [PK_M_Log] PRIMARY KEY CLUSTERED 
(
	[LogID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[M_CardType]    Script Date: 07/15/2018 11:30:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[M_CardType](
	[CTypeID] [nvarchar](50) NOT NULL,
	[CTypeCode] [nvarchar](50) NULL,
	[NameTH] [nvarchar](100) NULL,
	[NameEN] [nvarchar](100) NULL,
	[CreateDate] [datetime] NULL,
	[CreateBy] [nvarchar](50) NULL,
	[UpdateDate] [datetime] NULL,
	[UpdateBy] [nvarchar](50) NULL,
	[Status] [nvarchar](1) NULL,
 CONSTRAINT [PK__M_CardType] PRIMARY KEY CLUSTERED 
(
	[CTypeID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[M_CardType] ([CTypeID], [CTypeCode], [NameTH], [NameEN], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'41FC2C8B-7440-467A-A677-F5F239C4861B', N'VISA', N'วีซ่าการ์ด', N'Visa Card', CAST(0x0000A91D00EFA4A2 AS DateTime), N'Admin', NULL, NULL, N'1')
INSERT [dbo].[M_CardType] ([CTypeID], [CTypeCode], [NameTH], [NameEN], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'5F6D85B8-3352-429D-BE1C-BAB7BAAE73FD', N'AMEX', N'เอเม็ก', N'Amex', CAST(0x0000A91D00EFA4A2 AS DateTime), N'Admin', NULL, NULL, N'1')
INSERT [dbo].[M_CardType] ([CTypeID], [CTypeCode], [NameTH], [NameEN], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'60D29E79-CE81-4F94-AB9C-D1A9F0345778', N'JCB', N'เจซีบี', N'JCB', CAST(0x0000A91D00EFA4A2 AS DateTime), N'Admin', NULL, NULL, N'1')
INSERT [dbo].[M_CardType] ([CTypeID], [CTypeCode], [NameTH], [NameEN], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'CE116A28-BC68-4709-B679-D4197963FC7F', N'MASTER', N'มาสเตอร์การ์ด', N'Master Card', CAST(0x0000A91D00EFA4A2 AS DateTime), N'Admin', NULL, NULL, N'1')
/****** Object:  Table [dbo].[T_CreditCard]    Script Date: 07/15/2018 11:30:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_CreditCard](
	[CCID] [nvarchar](50) NOT NULL,
	[CTypeID] [nvarchar](50) NOT NULL,
	[CVV] [nvarchar](50) NULL,
	[CardNumber] [nvarchar](50) NULL,
	[HolderName] [nvarchar](100) NULL,
	[FName] [nvarchar](100) NULL,
	[LName] [nvarchar](100) NULL,
	[ExpireDate] [nvarchar](10) NULL,
	[CreateDate] [nvarchar](50) NULL,
	[CreateBy] [nvarchar](50) NULL,
	[UpdateDate] [datetime] NULL,
	[UpdateBy] [nvarchar](50) NULL,
	[Status] [nvarchar](1) NULL,
 CONSTRAINT [PK__T_CreditCard] PRIMARY KEY CLUSTERED 
(
	[CCID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[T_CreditCard] ([CCID], [CTypeID], [CVV], [CardNumber], [HolderName], [FName], [LName], [ExpireDate], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'24A22C7E-2513-4841-B24C-66C59099CBEB', N'41FC2C8B-7440-467A-A677-F5F239C4861B', N'123', N'4012345678901234', N'Piyaphon Kaewtap', N'Piyaphon', N'Kaewtap', N'122020', N'Jul 14 2018  9:11PM', N'Admin', NULL, NULL, N'1')
INSERT [dbo].[T_CreditCard] ([CCID], [CTypeID], [CVV], [CardNumber], [HolderName], [FName], [LName], [ExpireDate], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'B384DE93-31D9-4D06-9C89-389EF120DB2E', N'CE116A28-BC68-4709-B679-D4197963FC7F', N'123', N'5012345678901234', N'Piyaphon Kaewtap', N'Piyaphon', N'Kaewtap', N'122020', N'Jul 14 2018  9:12PM', N'Admin', NULL, NULL, N'1')
INSERT [dbo].[T_CreditCard] ([CCID], [CTypeID], [CVV], [CardNumber], [HolderName], [FName], [LName], [ExpireDate], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'E3B461DF-C725-43B5-9AF2-36D168E18044', N'5F6D85B8-3352-429D-BE1C-BAB7BAAE73FD', N'123', N'301234567890123', N'Piyaphon Kaewtap', N'Piyaphon', N'Kaewtap', N'122020', N'Jul 14 2018  9:13PM', N'Admin', NULL, NULL, N'1')
INSERT [dbo].[T_CreditCard] ([CCID], [CTypeID], [CVV], [CardNumber], [HolderName], [FName], [LName], [ExpireDate], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'EE868257-84EE-498E-81B7-B0E79A718230', N'60D29E79-CE81-4F94-AB9C-D1A9F0345778', N'123', N'3012345678901234', N'Piyaphon Kaewtap', N'Piyaphon', N'Kaewtap', N'122020', N'Jul 14 2018  9:13PM', N'Admin', NULL, NULL, N'1')
/****** Object:  Table [dbo].[T_CardValidation]    Script Date: 07/15/2018 11:30:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_CardValidation](
	[CVID] [nvarchar](50) NOT NULL,
	[CTypeID] [nvarchar](50) NULL,
	[Field] [nvarchar](50) NULL,
	[FieldType] [nvarchar](50) NULL,
	[Operation] [nvarchar](50) NULL,
	[OperationValue] [nvarchar](50) NULL,
	[ChkValidate] [nvarchar](1) NULL,
	[StartLength] [int] NULL,
	[Length] [int] NULL,
	[CompareValue] [nvarchar](50) NULL,
	[InvalidCaption] [nvarchar](100) NULL,
	[CreateDate] [datetime] NULL,
	[CreateBy] [nvarchar](50) NULL,
	[UpdateDate] [datetime] NULL,
	[UpdateBy] [nvarchar](50) NULL,
	[Status] [nvarchar](1) NULL,
 CONSTRAINT [PK__T_CardValidation] PRIMARY KEY CLUSTERED 
(
	[CVID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[T_CardValidation] ([CVID], [CTypeID], [Field], [FieldType], [Operation], [OperationValue], [ChkValidate], [StartLength], [Length], [CompareValue], [InvalidCaption], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'16A6A8B4-D424-4CC6-BE82-6997C16DA83B', N'5F6D85B8-3352-429D-BE1C-BAB7BAAE73FD', N'CardNumber', N'int', N'==', NULL, N'3', 0, 14, N'15', N'Amex length to be 15 characters', CAST(0x0000A91D01542716 AS DateTime), N'Admin', NULL, NULL, N'1')
INSERT [dbo].[T_CardValidation] ([CVID], [CTypeID], [Field], [FieldType], [Operation], [OperationValue], [ChkValidate], [StartLength], [Length], [CompareValue], [InvalidCaption], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'1BB15644-A2B3-42FC-A317-C3B79622883E', N'CE116A28-BC68-4709-B679-D4197963FC7F', N'CardNumber', N'int', N'==', NULL, N'2', 0, 1, N'5', N'The first charactoer of Master Card must be 5', CAST(0x0000A91D01516EFB AS DateTime), N'Admin', NULL, NULL, N'1')
INSERT [dbo].[T_CardValidation] ([CVID], [CTypeID], [Field], [FieldType], [Operation], [OperationValue], [ChkValidate], [StartLength], [Length], [CompareValue], [InvalidCaption], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'22207A0A-5313-4217-A840-94854D52A5DE', N'60D29E79-CE81-4F94-AB9C-D1A9F0345778', N'CardNumber', N'int', N'==', NULL, N'2', 0, 1, N'3', N'The first character of JCB must be 3', CAST(0x0000A91D01558917 AS DateTime), N'Admin', NULL, NULL, N'1')
INSERT [dbo].[T_CardValidation] ([CVID], [CTypeID], [Field], [FieldType], [Operation], [OperationValue], [ChkValidate], [StartLength], [Length], [CompareValue], [InvalidCaption], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'5CE68C8B-65FD-4926-B9A5-A27573064EC7', N'CE116A28-BC68-4709-B679-D4197963FC7F', N'CardNumber', N'int', N'==', NULL, N'3', 0, 15, N'16', N'Master Card length to be 16 characters', CAST(0x0000A91D0151A7F5 AS DateTime), N'Admin', NULL, NULL, N'1')
INSERT [dbo].[T_CardValidation] ([CVID], [CTypeID], [Field], [FieldType], [Operation], [OperationValue], [ChkValidate], [StartLength], [Length], [CompareValue], [InvalidCaption], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'6789AEE1-57C3-4EA9-9A5C-E6B5934CBC88', N'41FC2C8B-7440-467A-A677-F5F239C4861B', N'CardNumber', N'int', N'==', NULL, N'2', 0, 1, N'4', N'The first charactoer of Visa card must be 4', CAST(0x0000A91D010B3316 AS DateTime), N'Admin', NULL, NULL, N'1')
INSERT [dbo].[T_CardValidation] ([CVID], [CTypeID], [Field], [FieldType], [Operation], [OperationValue], [ChkValidate], [StartLength], [Length], [CompareValue], [InvalidCaption], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'861734BE-36EF-4E19-9182-274005D24196', N'5F6D85B8-3352-429D-BE1C-BAB7BAAE73FD', N'CardNumber', N'int', N'==', NULL, N'2', 0, 1, N'3', N'The first characters of Amex must be 3', CAST(0x0000A91D0153AF75 AS DateTime), N'Admin', NULL, NULL, N'1')
INSERT [dbo].[T_CardValidation] ([CVID], [CTypeID], [Field], [FieldType], [Operation], [OperationValue], [ChkValidate], [StartLength], [Length], [CompareValue], [InvalidCaption], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'97B0C4BC-3471-4F47-A2D3-16E0A50173EE', N'41FC2C8B-7440-467A-A677-F5F239C4861B', N'CardNumber', N'int', N'==', NULL, N'3', 0, 15, N'16', N'Visa card length to be 16 characters', CAST(0x0000A91D010BBDF9 AS DateTime), N'Admin', NULL, NULL, N'1')
INSERT [dbo].[T_CardValidation] ([CVID], [CTypeID], [Field], [FieldType], [Operation], [OperationValue], [ChkValidate], [StartLength], [Length], [CompareValue], [InvalidCaption], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'A78134C5-FD59-48E2-B321-A6AF3BE189C1', N'60D29E79-CE81-4F94-AB9C-D1A9F0345778', N'CardNumber', N'int', N'==', NULL, N'3', 0, 15, N'16', N'JCB length to be 16 characters', CAST(0x0000A91D01558917 AS DateTime), N'Admin', NULL, NULL, N'1')
INSERT [dbo].[T_CardValidation] ([CVID], [CTypeID], [Field], [FieldType], [Operation], [OperationValue], [ChkValidate], [StartLength], [Length], [CompareValue], [InvalidCaption], [CreateDate], [CreateBy], [UpdateDate], [UpdateBy], [Status]) VALUES (N'EA548AC9-15DF-4A14-B756-00DBBE9678E9', N'CE116A28-BC68-4709-B679-D4197963FC7F', N'ExpireDate', N'int', N'%', N'4', N'2', 2, 4, N'0', N'MasterCard is the card number which expiry year is a prime number', CAST(0x0000A91E0014B0F5 AS DateTime), N'Admin', NULL, NULL, N'1')
/****** Object:  StoredProcedure [dbo].[sp_T_CreditCard_FindbyColumn]    Script Date: 07/15/2018 11:30:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Script for SelectTopNRows command from SSMS  ******/

-- sp_T_CreditCard_FindbyColumn @CardNumber='4012345678901234'
CREATE procedure [dbo].[sp_T_CreditCard_FindbyColumn] (

@CCode nvarchar(10)='',
@HolderName nvarchar(50)='',
@CardNumber nvarchar(50)='',
@ExpireDate nvarchar(50)='',
@CVV nvarchar(10)=''
)
as
SELECT ccard.[CCID]
      ,ccard.[CTypeID]
      ,cType.CTypeCode
      ,ccard.CVV
      ,ccard.[CardNumber]
      ,ccard.[HolderName]
      ,ccard.[FName]
      ,ccard.[LName]
      ,ccard.[ExpireDate]
      ,ccard.[CreateDate]
      ,ccard.[CreateBy]
      ,ccard.[UpdateDate]
      ,ccard.[UpdateBy]
      ,ccard.[Status]
  FROM [T_CreditCard] ccard  inner join 
 M_CardType cType
on ccard.[CTypeID]=cType.[CTypeID]
  where 
  ccard.CardNumber = @CardNumber
GO
/****** Object:  StoredProcedure [dbo].[sp_T_CardValidation_FindAll]    Script Date: 07/15/2018 11:30:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_T_CardValidation_FindAll]
as


SELECT  trans.[CVID]
      ,trans.CTypeID
      ,ctype.CTypeCode 
       ,ctype.NameEN CardTypeName
      ,trans.[Field]
      ,trans.[FieldType]
      ,trans.[Operation]
       ,trans.OperationValue
      ,trans.ChkValidate
      ,trans.[StartLength]
      ,trans.[Length]
      ,trans.[CompareValue]
      ,trans.InvalidCaption
      ,trans.[CreateDate]
      ,trans.[CreateBy]
      ,trans.[UpdateDate]
      ,trans.[UpdateBy]
      ,trans.[Status]
  FROM [T_CardValidation]  trans 
      inner join M_CardType ctype
      on trans.CTypeID=ctype.CTypeID
  where trans.[status]=1
  
  -- select * from M_CardType
GO
/****** Object:  StoredProcedure [dbo].[sp_T_CardValidation_ByCardType]    Script Date: 07/15/2018 11:30:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--sp_T_CardValidation_ByCardType 'master'
CREATE procedure [dbo].[sp_T_CardValidation_ByCardType]
(@CTypeCode nvarchar(50))
as


SELECT  trans.[CVID]
      ,trans.[CTypeID]
      ,ctype.CTypeCode
       ,ctype.NameEN CardTypeName
      ,trans.[Field]
      ,trans.[FieldType]
      ,trans.[Operation]
       ,trans.OperationValue
      ,trans.[ChkValidate]
      ,trans.[StartLength]
      ,trans.[Length]
      ,trans.[CompareValue]
      ,trans.InvalidCaption
      ,trans.[CreateDate]
      ,trans.[CreateBy]
      ,trans.[UpdateDate]
      ,trans.[UpdateBy]
      ,trans.[Status]
  FROM [T_CardValidation]  trans 
      inner join M_CardType ctype
      on trans.CTypeID=ctype.CTypeID
  where trans.[status]=1
  and ctype.CTypeCode=@CTypeCode
  -- select * from M_CardType
GO
/****** Object:  StoredProcedure [dbo].[sp_M_Log_Insert]    Script Date: 07/15/2018 11:30:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
CREATE BY MR.Piyaphon kaewtap.
USE SQL SERVER 2000 SCRIPT TOOL FOR GENERATE.
MODIFIED DATE : Nov 19 2017  9:02PM.
*/
CREATE PROCEDURE [dbo].[sp_M_Log_Insert] (
	@LogID_1 [nvarchar](50) = '', 
	@LogDate_2 [nvarchar](10) ='', 
	@System_3 [nvarchar](200), 
	@Page_4 [nvarchar](200), 
	@Level_5 [nvarchar](20), 
	@Message_6 [nvarchar](1000), 
	@Desc_7 [nvarchar](1000)='', 
	@CreateBy_9 [nvarchar](50)='', 
	@ERROR_CODE [int] OUTPUT
) AS 

set @LogID_1=newid()
set @LogDate_2=Convert(nvarchar(10),getdate(),112)
INSERT INTO [M_Log] (
	[LogID], 
	[LogDate], 
	[System], 
	[Page], 
	[Level], 
	[Message], 
	[Desc], 
	[CreateDate], 
	[CreateBy]
) VALUES (
	@LogID_1, 
	@LogDate_2, 
	@System_3, 
	@Page_4, 
	@Level_5, 
	@Message_6, 
	@Desc_7, 
	getdate(), 
	@CreateBy_9
)
 
/* GET THE ERROR CODE FOR THE STATEMENT JUST EXECUTED */
SELECT @ERROR_CODE=@@ERROR
 
/* RETURN THE ERROR CODE FOR THE STATEMENT JUST EXECUTED */
RETURN @ERROR_CODE
GO
