# Refactoring for Local Data Store

This document outlines the plan to refactor the application to use a local data store for development purposes. The goal is to isolate the data layer so that it can be easily swapped with a Firebase backend in the future.

## Plan

1.  **Create a Local Data Store:** - DONE
    *   Create a new directory `lib/local` to house the local data store implementation. - DONE
    *   Create a file `lib/local/db.ts` to manage local data. This will simulate a database using in-memory arrays or JSON files. - DONE
    *   Define the data structures for products, orders, etc., in `lib/types.ts` if they don't already exist. - DONE

2.  **Refactor API Routes:** - DONE
    *   Modify the existing API routes in `app/api/` to use the local data store instead of the current data persistence mechanism. - DONE
    *   Update the following API routes: - DONE
        *   `app/api/contact/route.ts` - DONE
        *   `app/api/products/route.ts` - DONE
        *   `app/api/product/[id]/route.ts` - DONE
        *   `app/api/order-details/route.ts` - DONE
        *   `app/api/webhook/route.ts` - DONE

3.  **Refactor Admin Pages:** - DONE
    *   Update the admin pages in `app/admin/` to fetch and display data from the local data store via the updated API routes. - DONE
    *   `app/admin/packs/page.tsx` - DONE

4.  **Refactor Frontend Components:**
    *   Update the frontend components that display data to use the new data-fetching logic.
