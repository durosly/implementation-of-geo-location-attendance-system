import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import type { User } from "@/types/user";
import paginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema<User>(
	{
		email: { type: String, index: true },
		password: String,
		is_admin: { type: Boolean, default: false },
		college: String,
		department: String,
		fullname: String,
	},
	{ timestamps: true }
);

userSchema.plugin(paginate);

export type UserDB = User & mongoose.Document<User>;

// userSchema.plugin(bcrypt())
userSchema.pre("save", function (next) {
	const user = this;

	if (!user.isModified("password")) return next();

	// generate a salt
	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);

		// hash the password using our new salt
		if (!user?.password) return next();

		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
