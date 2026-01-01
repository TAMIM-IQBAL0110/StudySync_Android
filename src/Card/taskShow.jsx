import React from 'react';
import { FiCheckCircle, FiEdit2, FiTrash2 } from 'react-icons/fi';

const TaskShow = ({ Icon, Heading, Tasks, footer, handleCompleteTask, handleDeleteTask, navigate }) => {
  return (
    <div
      className="rounded-xl p-4 md:p-6 shadow-lg"
      style={{ backgroundColor: 'oklch(1 0.03 245)' }}
    >
      <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center gap-2" style={{ color: 'oklch(0.15 0.06 245)' }}>
        <Icon size={20} className="md:w-6 md:h-6" />
        <span className="truncate">{Heading}</span>
      </h2>

      {Tasks && Tasks.length > 0 ? (
        <div className="space-y-2 md:space-y-3 max-h-96 overflow-y-auto">
          {Tasks.slice(0, 10).map((task) => (
            <div
              key={task._id}
              className="p-3 md:p-4 rounded-lg"
              style={{ backgroundColor: 'oklch(0.96 0.03 245)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 md:gap-3 mb-2 md:mb-3">
                <div className="flex-1 min-w-0">
                  <p style={{ color: 'oklch(0.15 0.06 245)' }} className="font-medium text-sm md:text-base truncate">
                    {task.taskName}
                  </p>
                  <p style={{ color: 'oklch(0.4 0.06 245)' }} className="text-xs mt-1 font-semibold">
                    {new Date(task.date).toLocaleDateString('en-GB')} • {task.startTimeFormatted || 'N/A'}
                  </p>
                </div>

                <div className="flex gap-1 md:gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleCompleteTask(task._id, task.status)}
                    className="p-1.5 md:p-2 rounded-lg transition-all hover:scale-110"
                    style={{ backgroundColor: 'oklch(0.5 0.06 160)', color: 'white' }}
                    title="Mark complete"
                  >
                    <FiCheckCircle size={16} className="md:w-4.5 md:h-4.5" />
                  </button>

                  <button
                    onClick={() => navigate(`/dashboard/edit-task/${task._id}`)}
                    className="p-1.5 md:p-2 rounded-lg transition-all hover:scale-110"
                    style={{ backgroundColor: 'oklch(0.4 0.1 65)', color: 'white' }}
                    title="Edit task"
                  >
                    <FiEdit2 size={16} className="md:w-4.5 md:h-4.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="p-1.5 md:p-2 rounded-lg transition-all hover:scale-110"
                    style={{ backgroundColor: 'oklch(0.5 0.06 30)', color: 'white' }}
                    title="Delete task"
                  >
                    <FiTrash2 size={16} className="md:w-4.5 md:h-4.5" />
                  </button>
                </div>
              </div>

              {task.description && (
                <div
                  className="p-2 md:p-3 rounded-lg mt-2 md:mt-3"
                  style={{ backgroundColor: 'oklch(1 0.03 245)' }}
                >
                  <p style={{ color: 'oklch(0.4 0.06 245)' }} className="text-xs md:text-sm">
                    {task.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: 'oklch(0.4 0.06 245)' }} className="text-xs md:text-sm">
          {footer}
        </p>
      )}
    </div>
  );
};

export default TaskShow;
