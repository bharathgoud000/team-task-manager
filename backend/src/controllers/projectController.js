const prisma = require('../prisma')

exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body

    const project = await prisma.project.create({
      data: {
        title,
        description,
        createdBy: req.user.id
      }
    })

    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        tasks: true
      }
    })

    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}