export function Footer(){
    return (
        <footer className="mt-4 bg-slate-900 px-4 py-6 text-white md:px-6 md:py-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex flex-col items-center gap-3 text-sm font-semibold">
              <div className="flex flex-wrap justify-center gap-3 text-sm font-normal">
                <a
                  href="https://www.gsis.gov.ph"
                  className="text-white/90 underline-offset-4 hover:text-white hover:underline"
                >
                  Government Service Insurance System
                </a>
                <a
                  href="https://www.doj.gov.ph"
                  className="text-white/90 underline-offset-4 hover:text-white hover:underline"
                >
                  Department of Justice Website
                </a>
                <a
                  href="https://www.lbpiaccess.com"
                  className="text-white/90 underline-offset-4 hover:text-white hover:underline"
                >
                  Landbank Retail Internet Banking
                </a>
                <a
                  href="https://www.pnb.com.ph"
                  className="text-white/90 underline-offset-4 hover:text-white hover:underline"
                >
                  Philippine National Bank
                </a>
                <a
                  href="https://dojcoop.com"
                  className="text-white/90 underline-offset-4 hover:text-white hover:underline"
                >
                  DOJ Cooperative
                </a>
              </div>
            </div>

            <p className="text-center text-xs text-white/70">
              © {new Date().getFullYear()} MyDOJ Portal. All rights reserved.
            </p>
          </div>
        </footer>
    )
}
