import React from 'react';
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import {MainLayout} from './layouts/MainLayout/MainLayout';

import {ClassesByGroup} from './pages/ClassesByGroup/ClassesByGroup';
import {MainPage} from './pages/MainPage/MainPage';
import {TeacherPage} from './pages/teacherPage/TeacherPage';

import {store} from './redux/store';

const App = () => (
  <Provider store={store}>
    <MainLayout>
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="students" element={<ClassesByGroup />} />
        <Route path="teachers" element={<TeacherPage />} />
      </Routes>
    </MainLayout>
  </Provider>
);

export default App;
