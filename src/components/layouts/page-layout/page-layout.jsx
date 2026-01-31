import { Jumbotron, Sidebar } from "../../ui";
import { motion } from 'motion/react';

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.3, ease: 'easeInOut' }
};

function PageLayout ({ children, jumbotron }) {
    
    return (
        <>
            { jumbotron && <Jumbotron {...jumbotron} /> }
            <main className="container-fluid py-2 mx-0">
                <div className="row">
                    <Sidebar />
                    <motion.div
                        {...pageTransition}
                        className="col-9 col-md-10 col-sm-10"
                        >
                            { children }
                    </motion.div>
                </div>                
            </main>
        </>
    );
}

export default PageLayout;