import { Routes } from "@angular/router";
import { AdminLayout } from "./layout/admin-layout/admin-layout";
import { AnalysisSentimentPage } from "./pages/analysis-sentiment-page/analysis-sentiment-page";
import { AdminUserPage } from "./pages/user-page/user-page";
import { AdminGuard } from "./guards/Admin.guard";

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayout,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'reviews',
        component: AnalysisSentimentPage,
      },
      {
        path: 'users',
        component: AdminUserPage,
      },
      {
        path: '**',
        redirectTo: 'reviews',
      },
    ],
  },
];

export default adminRoutes;
