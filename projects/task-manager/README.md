# 📋 Task Manager - Full Stack Application

A modern, responsive task management application built with React.js frontend and Spring Boot backend. Stay organized and boost your productivity with intuitive task management features.

## ✨ Features

### 🎯 Core Functionality
- **Task CRUD Operations**: Create, read, update, and delete tasks
- **Priority Levels**: High, Medium, Low priority with visual indicators
- **Status Management**: Pending and Completed task states
- **Due Date Tracking**: Set and monitor task deadlines
- **Search & Filter**: Find tasks quickly with search and status filters
- **Real-time Sorting**: Sort by date, priority, title, or status

### 📊 Dashboard & Analytics
- **Task Statistics**: Visual completion rates and analytics
- **Priority Breakdown**: Charts showing task distribution by priority
- **Overdue Tracking**: Automatic detection and highlighting of overdue tasks
- **Progress Visualization**: Circular progress indicators

### 💫 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Engaging transitions and micro-interactions
- **Auto-save**: Automatic local storage of tasks
- **Intuitive UI**: Clean, modern interface with excellent usability
- **Toast Notifications**: User feedback for all actions

## 🚀 Technology Stack

### Frontend
- **React.js 18** - Modern React with hooks
- **React Router Dom** - Client-side routing
- **React Hook Form** - Efficient form handling
- **React Hot Toast** - Beautiful notifications
- **CSS3** - Modern styling with animations
- **Font Awesome** - Professional icons

### Backend (Coming Soon)
- **Java Spring Boot** - RESTful API backend
- **Spring Data JPA** - Data persistence
- **H2/MySQL Database** - Data storage
- **Maven** - Dependency management

### Development Tools
- **Create React App** - Development environment
- **ESLint** - Code quality
- **Axios** - HTTP client for API calls

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kushal-Kochar/task-manager.git
   cd task-manager/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`

### Backend Setup (Coming Soon)

1. **Navigate to backend directory**
   ```bash
   cd task-manager/backend
   ```

2. **Run Spring Boot application**
   ```bash
   ./mvnw spring-boot:run
   ```

3. **API will be available at**
   - `http://localhost:8080`

## 📱 Usage Guide

### Creating Tasks
1. Click on "Add New Task" to expand the form
2. Fill in task title (required), description, priority, and due date
3. Click "Add Task" to save

### Managing Tasks
- **Complete Task**: Click the circle icon to mark as completed
- **Edit Task**: Click the edit icon to modify task details
- **Delete Task**: Click the trash icon to remove task
- **Search**: Use the search bar to find specific tasks
- **Filter**: Use dropdown to filter by task status
- **Sort**: Click column headers to sort tasks

### Dashboard Analytics
- View completion rates in the circular progress indicator
- Monitor task distribution by priority levels
- Track overdue tasks and upcoming deadlines

## 🎨 Features Showcase

### 🎯 Task Management
- **Smart Prioritization**: Color-coded priority indicators
- **Status Tracking**: Visual completion states
- **Due Date Alerts**: Automatic overdue detection
- **Bulk Operations**: Sort and filter multiple tasks

### 📊 Analytics Dashboard
- **Completion Metrics**: Real-time progress tracking
- **Priority Distribution**: Visual breakdown charts
- **Quick Stats**: At-a-glance task summaries

### 🎭 User Interface
- **Glass Morphism**: Modern transparent design elements
- **Smooth Animations**: Engaging micro-interactions
- **Responsive Layout**: Perfect on all device sizes
- **Accessibility**: Screen reader friendly

## 📂 Project Structure

```
task-manager/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskList.js
│   │   │   ├── TaskItem.js
│   │   │   ├── TaskStats.js
│   │   │   └── Footer.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── Header.css
│   │   │   ├── TaskForm.css
│   │   │   ├── TaskList.css
│   │   │   ├── TaskItem.css
│   │   │   ├── TaskStats.css
│   │   │   └── Footer.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── backend/ (Coming Soon)
│   ├── src/main/java/
│   ├── src/main/resources/
│   ├── pom.xml
│   └── README.md
└── README.md
```

## 🚀 API Documentation (Backend Coming Soon)

### Task Endpoints
```
GET    /api/tasks          - Get all tasks
POST   /api/tasks          - Create new task
GET    /api/tasks/{id}     - Get task by ID
PUT    /api/tasks/{id}     - Update task
DELETE /api/tasks/{id}     - Delete task
```

### Task Model
```json
{
  "id": 1,
  "title": "Complete project",
  "description": "Finish the task manager application",
  "priority": "high",
  "status": "pending",
  "dueDate": "2024-01-15",
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-01T10:00:00Z"
}
```

## 🌟 Live Demo

[View Live Demo](https://kushal-task-manager.netlify.app) *(Coming Soon)*

## 📸 Screenshots

*Screenshots will be added after deployment*

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
```bash
npm run build
# Deploy the build folder
```

### Backend Deployment (Heroku/AWS)
```bash
./mvnw clean package
# Deploy the JAR file
```

## 🔮 Roadmap & Future Enhancements

- [ ] **Backend Integration**: Complete Spring Boot REST API
- [ ] **User Authentication**: Login/signup functionality
- [ ] **Team Collaboration**: Multi-user task sharing
- [ ] **Categories & Tags**: Advanced task organization
- [ ] **File Attachments**: Add files to tasks
- [ ] **Email Notifications**: Due date reminders
- [ ] **Mobile App**: React Native version
- [ ] **Dark Mode**: Theme switching
- [ ] **Export/Import**: Data portability
- [ ] **Calendar View**: Visual timeline
- [ ] **Subtasks**: Hierarchical task breakdown
- [ ] **Time Tracking**: Productivity analytics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- Local storage only (no backend persistence yet)
- No user authentication (single user app)
- No real-time collaboration

## 📝 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

## 👤 Author

**Kushal Kochar**
- Portfolio: [kushal-kochar.dev](https://kushal-kochar.dev)
- LinkedIn: [@kushal-kochar](https://linkedin.com/in/kushal-kochar-158b99143)
- GitHub: [@Kushal-Kochar](https://github.com/Kushal-Kochar)
- Email: kushalrkk19@gmail.com

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Font Awesome** - For beautiful icons
- **Create React App** - For the development setup
- **Community** - For inspiration and feedback

## 📊 Project Stats

- **Frontend**: ✅ Complete
- **Backend**: 🚧 In Development
- **Mobile Responsive**: ✅ Yes
- **Accessibility**: ✅ WCAG Compliant
- **Performance**: ⚡ Optimized
- **SEO Ready**: ✅ Meta tags included

---

**Built with ❤️ by Kushal Kochar** - *Showcasing Full Stack Development Skills*
