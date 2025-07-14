import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Run the sitemap generation script
      await execPromise('npx next-sitemap');
      
      res.status(200).json({ message: 'Sitemap updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to regenerate sitemap' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
