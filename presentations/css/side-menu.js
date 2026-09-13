document.addEventListener('DOMContentLoaded', () => {
  const menuDemo = document.querySelector('.menu-demo');

  if (menuDemo) {
    const toggle = menuDemo.querySelector('.menu-demo-toggle');
    const close = menuDemo.querySelector('.menu-demo-close');
    const overlay = menuDemo.querySelector('.menu-demo-overlay');

    if (toggle) {
      toggle.addEventListener('click', () => {
        menuDemo.classList.add('open');
      });
    }

    if (close) {
      close.addEventListener('click', () => {
        menuDemo.classList.remove('open');
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        menuDemo.classList.remove('open');
      });
    }
  }

  const taskDemo = document.querySelector('.menu-task-demo');

  if (taskDemo) {
    const openButton = taskDemo.querySelector('.task-menu-button');
    const closeButton = taskDemo.querySelector('.task-close');
    const overlay = taskDemo.querySelector('.task-overlay');

    function openMenu() {
      taskDemo.classList.add('is-open');
    }

    function closeMenu() {
      taskDemo.classList.remove('is-open');
    }

    if (openButton) {
      openButton.addEventListener('click', openMenu);
    }

    if (closeButton) {
      closeButton.addEventListener('click', closeMenu);
    }

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }
  }
});
