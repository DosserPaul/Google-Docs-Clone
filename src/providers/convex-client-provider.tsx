"use client";

import {ReactNode} from "react";
import {Authenticated, AuthLoading, ConvexReactClient, Unauthenticated} from "convex/react";
import {ClerkProvider, SignIn, useAuth} from "@clerk/nextjs";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import Loader from "@/components/loader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({children}: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk
        useAuth={useAuth}
        client={convex}
      >
        <Authenticated>
          {children}
        </Authenticated>
        <Unauthenticated>
          <div className="min-h-screen flex items-center justify-center">
            <SignIn routing="hash"/>
          </div>
        </Unauthenticated>
        <AuthLoading>
          <Loader label="Authenticating login..."/>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
