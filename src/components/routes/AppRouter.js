import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  COMPLETED,
  DELETED,
  IMPORTANT,
  MY_TASKS,
  RESULT
} from './constants';

const LazyCompleted = lazy(() => import('../../pages/Completed'));
const LazyDeleted = lazy(() => import('../../pages/Deleted'));
const LazyImportant = lazy(() => import('../../pages/Important'));
const LazyMyTasks = lazy(() => import('../../pages/MyTasks'));
const LazyResult = lazy(() => import('../../pages/Result'));

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={MY_TASKS} element={<LazyMyTasks />} index />
        <Route path={IMPORTANT} element={<LazyImportant />} />
        <Route path={COMPLETED} element={<LazyCompleted />} />
        <Route path={DELETED} element={<LazyDeleted />} />
        <Route path={RESULT} element={<LazyResult />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
