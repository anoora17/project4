export default {
    MAX_ATTACHMENT_SIZE: 5000000,   
		 apiGateway: {
		    REGION: "us-east-1",
		    URL: "https://zpbfacc9fg.execute-api.us-east-1.amazonaws.com/prod"
		  },

		cognito: {
		    REGION: "us-east-1",
		    USER_POOL_ID: "us-east-1_FNhgPoRdz",
		    APP_CLIENT_ID: "5dcs150h21p32sapvoug0lkrc",
		    IDENTITY_POOL_ID: "us-east-1:e1924a8b-c3a8-4f28-a512-a377fcd22ec4"
		  },

		  s3: {
			 BUCKET: "resumes-app"
			}
};

