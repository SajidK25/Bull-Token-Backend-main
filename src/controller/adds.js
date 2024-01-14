require("dotenv").config();
const AddModel = require("../models/addsModel");
const EventModel = require("../models/eventModel");
const ScreenModel = require("../models/screensModel");
const User = require("../models/userModel");
const express = require("express");
const app = express();
app.use(express.json());

//Find User By Referral Token
const GetAllAdds = async (req, res) => {
  try {
    const event = await AddModel.find({}).sort();
    res.status(200).json({ event });
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

// Mining Controller
// const StartMining = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findOneAndUpdate(
//       { _id: id },
//       { start: true },
//       {
//         new: true,
//       }
//     );

//     if (user) {
//       const interval = setInterval(async () => {
//         try {
//           const updatedUser = await User.findById(id);

//           if (updatedUser) {
//             updatedUser.coins += 0.00034;
//             await updatedUser.save();
//           } else {
//             clearInterval(interval);
//           }
//         } catch (error) {
//           console.error("Error updating coins:", error);
//           clearInterval(interval);
//         }
//       }, 1000);

//       setTimeout(async () => {
//         clearInterval(interval);

//         // Update user start status to false
//         const finalUser = await User.findOneAndUpdate(
//           { _id: id },
//           { start: false },
//           {
//             new: true,
//           }
//         );

//         res
//           .status(200)
//           .json({ message: "Mining Completed Success", completed: true });
//       }, 1000 * 3600 * 6);
//     } else {
//       res.status(404).json({ message: "User Not Found" });
//     }
//   } catch (e) {
//     res.status(500).json(e);
//   }
// };

const StartMining = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndUpdate(
      { _id: id },
      { start: true },
      {
        new: true,
      }
    );

    if (user) {
      // Calculate coins per second to reach the target in 6 hours
      const coinsPerSecond = 180 / (6 * 60 * 60); // 180 coins in 6 hours

      const interval = setInterval(async () => {
        try {
          const updatedUser = await User.findById(id);

          if (updatedUser) {
            updatedUser.coins += coinsPerSecond;
            await updatedUser.save();
          } else {
            clearInterval(interval);
          }
        } catch (error) {
          console.error("Error updating coins:", error);
          clearInterval(interval);
        }
      }, 1000);

      setTimeout(async () => {
        clearInterval(interval);

        // Update user start status to false
        const finalUser = await User.findOneAndUpdate(
          { _id: id },
          { start: false },
          {
            new: true,
          }
        );

        res
          .status(200)
          .json({ message: "Mining Completed Successfully", completed: true });
      }, 1000 * 3600 * 6);
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
};



module.exports = {
  GetAllAdds,
  StartMining
};