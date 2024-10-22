const Team = require('../models/teamModel');
const Player = require('../models/playerModel');
exports.createTeam = async (req, res) => {
  const { name, playerIds } = req.body;

  try {
    const players = await Player.find({ _id: { $in: playerIds } });
    if (players.length !== playerIds.length) {
      return res.status(400).json({ message: 'One or more players not found' });
    }

    const team = new Team({
      name,
      players: playerIds,
    });

    const savedTeam = await team.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('players');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
