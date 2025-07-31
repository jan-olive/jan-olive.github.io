  const menuItems = document.querySelectorAll('.menu ul li');
  const panels = document.querySelectorAll('.content section');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menuItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      panels.forEach(panel => panel.classList.remove('pactive'));
      const panelId = item.getAttribute('data-panel');
      const panelToShow = document.getElementById(panelId);
      if (panelToShow) {
        panelToShow.classList.add('pactive');
      }
      checkScrollbar();
    });
  });

  function checkScrollbar() {
    const windows = document.querySelector('.windows');
    const content = document.querySelector('.content');
    if (!windows || !content) return;
    if (content.scrollHeight > content.clientHeight) {
      windows.classList.add('has-scrollbar');
    } else {
      windows.classList.remove('has-scrollbar');
    }
  }

  window.addEventListener('DOMContentLoaded', checkScrollbar);
  window.addEventListener('resize', checkScrollbar);

  // Sidebar toggle logic
  document.querySelector('.logo-toggle')?.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('collapsed');
    localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed'));
  });

  if (localStorage.getItem('sidebar-collapsed') === 'true') {
    document.querySelector('.sidebar')?.classList.add('collapsed');
  }

  // ----- Projects Logic -----
  let currentProject = 0;
  const projects = document.querySelectorAll('.project');
  const projectId = document.querySelector('.projectid');

  function updateProjects() {
    projects.forEach((project, i) => {
      project.classList.toggle('active', i === currentProject);
    });
    projectId.textContent = `${currentProject + 1} / ${projects.length}`;
  }

  function scrollProjects(direction) {
    currentProject = (currentProject + direction + projects.length) % projects.length;
    updateProjects();
  }

// ----- Notes Logic -----
let currentNote = 0;
const notes = document.querySelectorAll('#notes .notes');
const notesId = document.querySelector('.notesid');

function updateNotes() {
  notes.forEach((note, i) => {
    note.classList.toggle('active', i === currentNote);
  });
  notesId.textContent = `${currentNote + 1} / ${notes.length}`;
}

function scrollNotes(direction) {
  currentNote = (currentNote + direction + notes.length) % notes.length;
  updateNotes();
}

document.addEventListener('DOMContentLoaded', () => {
  updateProjects(); 
  updateNotes();    
});

  // ----- Keyboard Handling -----
  window.addEventListener('keydown', (event) => {
    const projectsSection = document.getElementById('projects');
    const notesSection = document.getElementById('notes');

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      if (projectsSection.classList.contains('pactive')) {
        scrollProjects(event.key === 'ArrowLeft' ? -1 : 1);
      } else if (notesSection.classList.contains('pactive')) {
        scrollNotes(event.key === 'ArrowLeft' ? -1 : 1);
      }
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    updateProjects();
    showNote(currentNote);
  });
// ----- Window Controls -----
  const maximizeBtn = document.querySelector('.maximize');
const windowEl = document.querySelector('.windows');

maximizeBtn?.addEventListener('click', () => {
  const isMaximized = windowEl.classList.toggle('maximized');
  maximizeBtn.textContent = isMaximized ? '🗗' : '☐';
  }
);