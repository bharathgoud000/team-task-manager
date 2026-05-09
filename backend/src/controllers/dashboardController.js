const prisma = require('../prisma')

exports.getDashboard = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany()

    const totalTasks = tasks.length
    const completed = tasks.filter(t => t.status === 'DONE').length
    const pending = tasks.filter(t => t.status === 'TODO').length

    const overdue = tasks.filter(task => {
      return new Date(task.dueDate) < new Date() && task.status !== 'DONE'
    }).length

    res.json({
      totalTasks,
      completed,
      pending,
      overdue
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}