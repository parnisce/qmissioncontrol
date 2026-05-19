import { supabase } from './supabase';

// AI Employees
export const getAiEmployees = async () => {
  const { data, error } = await supabase.from('ai_employees').select('*');
  if (error) throw error;
  return data;
};

// Marketplace Skills
export const getMarketplaceSkills = async () => {
  const { data, error } = await supabase.from('marketplace_skills').select('*');
  if (error) throw error;
  return data;
};

// Workflows
export const getWorkflows = async () => {
  const { data, error } = await supabase.from('workflows').select('*');
  if (error) throw error;
  return data;
};

// Workflow Executions (Live Activity)
export const getWorkflowExecutions = async () => {
  const { data, error } = await supabase.from('workflow_executions').select('*');
  if (error) throw error;
  return data;
};

// Tasks
export const getTasks = async () => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) throw error;
  return data;
};
