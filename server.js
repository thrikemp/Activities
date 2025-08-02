const express = require("express");
const app = express();
const PORT = 5000;
const data = require("./data.json");

// middleware
app.use(express.json());

// HTTP REQUESTS
// GET
// DELETE
// POST
// PUT

// GET REQUESTS API
// path, callback function
app.get("/api/profile", function (req, res) {
  res.json(data);
});

// method ni app nga object
app.post("/api/create-profile", function (req, res) {
  // // dot notation
  // const profile = req.body.profile;
  // const name = req.body.name;

  // destructure
  const { profile, name } = req.body;

  // validation
  let errors = [];

  if (!profile)
    errors.push({
      message: "Profile is required",
    });
  if (!name) {
    errors.push({
      message: "Name is required.",
    });
  }
  if (errors.length > 0) {
    return res.status(404).json(errors);
  }

  // ternary
  // shortcut sa if else function
  const newId =
    data.length > 0 ? Math.max(...data.map((p) => parseInt(p.id))) + 1 : "1";

  const newProfile = { id: newId, profile, name };

  data.push(newProfile);

  res.status(200).json({
    message: "Profile has been created successfully",
    newProfile,
  });
});

// :id parameter
app.delete("/api/delete/:id", function (req, res) {
  const { id } = req.params;
  const findIndex = data.findIndex((index) => index.id === parseInt(id));

  if (findIndex === -1)
    return res.status(404).json({
      message: "No profile has been found",
    });

  const deleted = data.splice(findIndex, 1)[0];

  res.status(201).json({
    message: "Profile has been deleted successfully",
    deleted,
  });
});

// update api
app.put("/api/update-profile/:id", function (req, res) {
  const { id } = req.params;
  // find function
  const foundProfile = data.find((profile) => profile.id === parseInt(id));

  const { profile, name } = req.body;

  let errors = [];

  if (!profile)
    errors.push({
      message: "Profile is required",
    });
  if (!name) {
    errors.push({
      message: "Name is required.",
    });
  }
  if (errors.length > 0) {
    return res.status(404).json(errors);
  }

  if (profile) foundProfile.profile = profile;
  if (name) foundProfile.name = name;

  res.status(201).json({
    message: "Profile has been updated successfully",
  });
});

app.listen(PORT, function () {
  console.log(`http://localhost:${PORT}`);
});
