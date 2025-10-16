"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/";
import { ArrowRight, ChartBarStacked, ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const quickActions = [
    {
      title: "Categories",
      description: "Manage Your Categories",
      icon: ChartBarStacked,
      href: "/categories",
      color: "bg-green-500",
    },
    {
      title: "Products",
      description: "Manage Your Products",
      icon: ShoppingBasket,
      href: "/products",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to Product Manager
          </h1>
          <p className="text-muted-foreground">
            Manage your products efficiently from one central dashboard
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {quickActions.map((action) => (
          <Card
            key={action.title}
            className="cursor-pointer hover:shadow-md  transition-all ease-in-out duration-300"
            onClick={() => router.push(action.href)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className={`p-2 rounded-md ${action.color}`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-transparent"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">{action.title}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {action.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="">
        {/* Modules Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System Modules</CardTitle>
            <CardDescription>
              Quick access to all management modules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 w-full flex justify-center items-center">
              <p className="text-base text-muted-foreground text-center">
                Coming Soon ...{" "}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
