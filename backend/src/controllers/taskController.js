const prisma = require('../prisma')

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      projectId,
      assignedTo
    } = req.body

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate,
        projectId,
        assignedTo
      }
    })

    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        assignedUser: true
      }
    })

    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body

    const updatedTask = await prisma.task.update({
      where: {
        id: req.params.id
      },
      data: {
        status
      }
    })

    res.json(updatedTask)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}