USE [file-management]
GO

/****** Object:  Table [dbo].[file_entity]    Script Date: 3/1/2025 9:31:26 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[file_entity](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[filename] [nvarchar](255) NOT NULL,
	[path] [nvarchar](255) NOT NULL,
	[mimetype] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_d8375e0b2592310864d2b4974b2] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


